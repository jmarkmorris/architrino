# Numerical recipe and stability

Event-aware integration (practical algorithm):

1. Root finding:
   - For each transmitter $o$ (including $o'=o$ for potential self-hits), solve $F(T_t;T_r)=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|-(T_r-T_t)=0$ for $T_t<T_r$.
   - Discard non-physical roots by convention $H(0)=0$ (exclude $\Delta T=0$); note $r=0$ occurs only at $\Delta T=0$ and is thus excluded.

2. Per-hit accumulation:
   - For each accepted root, compute $r$, $\hat{\mathbf{r}}$, $D_t=1-\mathbf V_o(T_t)\cdot\hat{\mathbf r}$, $D_r=1-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf r}$, and $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. Then use
     $$
     \mathbf A_{o'\leftarrow o}(T_r;T_t)=\kappa\,\sigma_{q_o q_{o'}}\,\frac{|q_o q_{o'}|}{r^2}W^{\mathrm{acc}}\,\hat{\mathbf{r}}
     $$

     [Explore this equation in Equation Mapping](../../../../../../equation-mapping.html#corpus-equation-af40ad24c32aee01)
   - Sum over all transmitters and all roots (superposition).

3. Time stepping:
   - Impulsive mode: advance velocities with jumps at hit times (measure-driven ODE with velocity of bounded variation).
   - Mollified mode: replace $\delta(\cdot)$ by $\delta_\eta(\cdot)$ and integrate with a delayed-history solver or an augmented-state method that retains the required path segment; choose $\eta$ small relative to local geometric scales.

4. Stability tips:
   - Use event bracketing or root trackers for continuity of $T_t(T)$ across steps.
   - Limit step size so that at most one (or a controlled number of) mollified wake surfaces overlap significantly per step.
   - Monitor invariants over resolved windows (work–energy balance with $\Phi_\eta$) to validate settings.

5. Units:
   - Use $c_f=1$ nondimensionalization throughout. Remember: emission cadence and per-wavefront amplitude are constant; receiver speed enters signed root playback through $D_r/D_t$ and instantaneous power through $v_r$, not the acceleration weight.

6. Two-body closure run packet:
   - For a candidate electrino:positrino binary, emit the signed branch ledger $b$, regulator $\eta$, step or collocation scale $\Delta T_{\mathrm{step}}$, candidate period $P_b$, and the canonical residual tuple owned by [Binary Dynamics](../../../dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target). This recipe does not define a second tuple or field order.
   - Do not advance the candidate if the signed ledger changes during the reported period, an active transmitter-side Jacobian floor or inactive-root gap vanishes, the transmitter-side acceleration weight leaves its certified interval or its floor $\nu_{\mathrm{rec}}^{2\mathrm{B}}$ vanishes, the projected return-map spectrum is not computed, the energy residuals use a different window or branch chart than the motion residuals, or the extracted frequency is not stable under refinement.
   - Treat a visually periodic orbit without these entries as a search hit only. It is not a binary closure certificate.

Plain language: At each reception time, find which past emissions can reach the receiver, compute how the transmitter laid down the wake and how the receiver crosses it, sum the radial acceleration contributions with $W^{\mathrm{acc}}/r^2$ strength, and step forward either with sharp kicks at exact hit times or with thin mollified wake surfaces for smooth integration.
