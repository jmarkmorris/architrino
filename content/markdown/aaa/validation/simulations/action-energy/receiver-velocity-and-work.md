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

## Decomposition and Energetics

- Decomposition at a hit:
  - Write $\mathbf V = V_r\,\hat{\mathbf{r}} + \mathbf V_\perp$, where $V_r=\mathbf V\cdot\hat{\mathbf{r}}$ and $\mathbf V_\perp\cdot\hat{\mathbf{r}}=0$.
  - A single hit changes $V_r$ but not $\mathbf V_\perp$ instantaneously.

- Power and work:
  - The signed instantaneous acceleration-power proxy is
    $\mathbf A\cdot\mathbf V=(\mathbf A\cdot\hat{\mathbf r})V_r$.
    It reduces to $\|\mathbf A\|V_r$ only for a repulsive contribution directed along $+\hat{\mathbf r}$; an attractive contribution carries the opposite sign.
  - Orthogonal motion does no instantaneous work; only radial motion exchanges kinetic and potential energy at a hit.

- Local trend via $1/r^2$:
  - If $V_r<0$ (moving inward), near-future hits tend to be stronger because $r$ shrinks between events; if $V_r>0$, they tend to weaken.

Plain language: Each hit changes only the along-the-line speed at that event; sideways speed is untouched by that contribution. The signed energy transfer depends on both radial motion and whether the contribution points along or against the line-of-action direction.
