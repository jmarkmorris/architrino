# Receiver velocity and work

Because $\mathbf A_{o'\leftarrow o}(T_r;T_t)\parallel\hat{\mathbf{r}}$, a single hit changes only the velocity component along its instantaneous line of action:
$$
\left.\frac{d}{dT_r}\mathbf V_\perp\right|_{\text{this hit}}=\mathbf{0},
\qquad
\left.\frac{d}{dT_r}V_r\right|_{\text{this hit}}
=
\mathbf A_{o'\leftarrow o}(T_r;T_t)\cdot\hat{\mathbf{r}}
=
\frac{\kappa\,\sigma_{q_o q_{o'}}\,\lvert q_o q_{o'}\rvert}{r^2}
W_{o'\leftarrow o}^{\mathrm{acc}}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../../equation-mapping.html#corpus-equation-79f5d2581fbf221a)

## Decomposition and Energetics

- Decomposition at a hit:
  - Write $\mathbf V = V_r\,\hat{\mathbf{r}} + \mathbf V_\perp$, where $V_r=\mathbf V\cdot\hat{\mathbf{r}}$ and $\mathbf V_\perp\cdot\hat{\mathbf{r}}=0$.
  - A single hit changes $V_r$ but not $\mathbf V_\perp$ instantaneously.

- Power and work:
  - The signed instantaneous acceleration-power proxy is $\mathbf A\cdot\mathbf V=(\mathbf A\cdot\hat{\mathbf r})V_r$. It reduces to $\|\mathbf A\|V_r$ only for a repulsive contribution directed along $+\hat{\mathbf r}$; an attractive contribution carries the opposite sign.
  - For the specific kinetic proxy $K_{\mathrm{spec}}=\tfrac12\|\mathbf V\|^2$, the per-hit rate is $dK_{\mathrm{spec}}/dT=\mathbf A\cdot\mathbf V$. An energy-valued bookkeeping row must instead declare the universal conversion $\mu_{\text{arch}}$ and use $K_\mu=\tfrac12\mu_{\text{arch}}\|\mathbf V\|^2$, so $dK_\mu/dT=\mu_{\text{arch}}\mathbf A\cdot\mathbf V$.
  - Orthogonal motion contributes no instantaneous acceleration power. A fixed-transmitter benchmark may identify the radial integral with a potential-energy change, but moving-transmitter, self-hit, and open-boundary histories require the constructive wake/history and boundary terms in [Delay Dynamics Energy](delay-dynamics-energy.md).

- Local trend via $1/r^2$:
  - If $V_r<0$ (moving inward), near-future hits tend to be stronger because $r$ shrinks between events; if $V_r>0$, they tend to weaken.

Plain language: Each hit changes only the along-the-line speed at that event; sideways speed is untouched by that contribution. The signed specific-power row follows directly from acceleration and velocity, while an energy claim additionally needs the declared bookkeeping conversion and the applicable history-aware energy construction.
