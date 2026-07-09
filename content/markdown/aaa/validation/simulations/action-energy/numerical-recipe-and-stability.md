# Numerical recipe and stability

Event-aware integration (practical algorithm):

1. Root finding:
   - For each source $o$ (including $o'=o$ for potential self-hits), solve $F(T_{\mathrm{em}};T)=\|\mathbf X_{o'}(T)-\mathbf X_o(T_{\mathrm{em}})\|-(T-T_{\mathrm{em}})=0$ for $T_{\mathrm{em}}< T$.
   - Discard non-physical roots by convention $H(0)=0$ (exclude $\Delta T=0$); note $r=0$ occurs only at $\Delta T=0$ and is thus excluded.

2. Per-hit accumulation:
   - For each accepted root, compute $r$, $\hat{\mathbf{r}}$,
     $D_s=1-\mathbf V_o(T_{\mathrm{em}})\cdot\hat{\mathbf r}$,
     $D_T=1-\mathbf V_{o'}(T)\cdot\hat{\mathbf r}$, and
     $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$. Then use
     $$
     \mathbf A_{o'\leftarrow o}(T;T_{\mathrm{em}})=\kappa\,\sigma_{q_o q_{o'}}\,\frac{|q_o q_{o'}|}{r^2}W^{\mathrm{rec}}\,\hat{\mathbf{r}}
     $$
   - Sum over all sources and all roots (superposition).

3. Time stepping:
   - Impulsive mode: advance velocities with jumps at hit times (measure-driven ODE with velocity of bounded variation).
   - Mollified mode: replace $\delta(\cdot)$ by $\delta_\eta(\cdot)$ and integrate with a standard ODE solver; choose $\eta$ small relative to local geometric scales.

4. Stability tips:
   - Use event bracketing or root trackers for continuity of $T_{\mathrm{em}}(T)$ across steps.
   - Limit step size so that at most one (or a controlled number of) mollified wake surfaces overlap significantly per step.
   - Monitor invariants over resolved windows (work–energy balance with $\Phi_\eta$) to validate settings.

5. Units:
   - Use $v=1$ nondimensionalization throughout. Remember: emission cadence and per-wavefront amplitude are constant; receiver speed enters branch strength through $D_T$ and instantaneous power through $v_r$.

6. Two-body closure run packet:
   - For a candidate electrino:positrino binary, emit the signed branch ledger $b$, regulator $\eta$, step or collocation scale $h$, candidate period $P_b$, and the residual tuple
     $$
     \mathsf{Run}_{2\mathrm{B}}^{(\eta)}
     =
     \left(
     \mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}},
     \mathcal{R}_{\mathrm{per}}^{2\mathrm{B}},
     \mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}},
     \nu_J^{2\mathrm{B}},
     \nu_{\mathrm{rec}}^{2\mathrm{B}},
     \Delta_{\mathrm{gap}}^{2\mathrm{B}},
     \lambda_{\mathrm{sec}}^{2\mathrm{B}},
     \epsilon_E^{(\eta)},
     \Delta_{\mathrm{E,cross}}^{(\eta)},
     \mathcal{R}_{\omega}^{2\mathrm{B}}
     \right).
     $$
   - Fail closed if the signed ledger changes during the reported period, an active source-normal Jacobian floor or inactive-root gap vanishes, the receiver-normal branch strength leaves its certified interval or its floor $\nu_{\mathrm{rec}}^{2\mathrm{B}}$ vanishes, the projected return-map spectrum is not computed, the energy residuals use a different window or branch chart than the motion residuals, or the extracted frequency is not stable under refinement.
   - Treat a visually periodic orbit without these entries as a search hit only. It is not a binary closure certificate.

Plain language: At each time, find which past emissions can reach the receiver now, compute how the source laid down the wake and how the receiver crosses it, sum the radial pushes with $W^{\mathrm{rec}}/r^2$ strength, and step forward either with sharp kicks at exact hit times or with thin mollified wake surfaces for smooth integration.
