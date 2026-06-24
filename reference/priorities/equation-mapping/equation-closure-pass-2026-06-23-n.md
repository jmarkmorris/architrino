# Equation Closure Pass 2026-06-23 N

## Scope

- `EQ-15` Klein-Gordon, Dirac, spinor, and spin-statistics row.
- Ordered-frame spinor-label pullback in [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md).
- Non-coplanar retained-row blockers from the angular-momentum and spin priority packets.

## Result

This pass adds an `EQ-15` retained-row status map next to the row requirements. The status map keeps the row at:

```text
blocked_missing_retained_non_gauge_spinor_row
scoreDecision: no_score_increase
```

The current blocker is not missing notation. It is missing retained-row data for:

- the non-coplanar path row;
- active-root transport;
- emission, causal-writhe, and chirality provenance;
- quotient and gauge-control probes;
- conservation and doubled-path return;
- downstream exchange/sign pullback.

The populated null-control material remains ordinary visible $SO(3)$ closure. It is not spinor support.

The sharper theorem route is a covering-space obstruction. A retained ordered-frame loop should supply

$$
\Phi_\star:S^1\to SO(3),
\qquad
p\circ\widetilde\Phi_\star=\Phi_\star,
\qquad
p:\mathrm{Spin}(3)=SU(2)\to SO(3).
$$

The score-moving scalar is the endpoint class

$$
\eta_{\mathrm{spin}}(\Phi_\star)
=
\begin{cases}
0,& \widetilde\Phi_\star(1)=\widetilde\Phi_\star(0),\\
1,& \widetilde\Phi_\star(1)=-\widetilde\Phi_\star(0),
\end{cases}
\in\mathbb Z/2.
$$

A gauge quotient move must preserve $\eta_{\mathrm{spin}}$; a move changing it is a physical history-sheet change.

## Score Disposition

No score changes. `EQ-15` remains `2` in `6/23 b`. A score move to `3` requires one retained non-gauge row with odd $2\pi$ parity, $4\pi$ restoration, gauge-control pass, quotient witness, and angular-momentum residuals on the same branch record.

## Closure Value

This pass prevents the spinor row from looking more mature than it is. It also gives the next executable or proof packet an exact checklist: populate the retained non-coplanar row first, then let the Dirac/spinor comparison remain a downstream effective chart.

## Next Closure Step

Build or identify one retained branch row carrying:

$$
\left(
D_{HML}(s),
\gamma_{2\pi},
\gamma_{4\pi},
t_{0,r_\star}^{(b_\star)}(s),
q_{r_\star}^{2\pi},
q_{r_\star}^{4\pi},
\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(s)
\right)
$$

plus a populated gauge-probe table and physical-vs-gauge witness. Until that exists, `EQ-15` is a well-posed proof target rather than a recovered spinor equation.

The target certificate is

$$
\mathfrak C_{\mathrm{spin}\to\mu}
=
\left(
\Phi_\star,\widetilde\Phi_\star,\eta_{\mathrm{spin}},
\Delta_{\mathrm{gauge}},
\Delta_{\mathbf J},
\boldsymbol\mu_{\mathcal E},
g_{\mathrm{lead}},
\mathcal R_{\mathrm{fib}}
\right),
$$

where $\mathcal R_{\mathrm{fib}}$ is the exposure-fiber nonuniformity residual that later feeds the first $g-2$ row.
