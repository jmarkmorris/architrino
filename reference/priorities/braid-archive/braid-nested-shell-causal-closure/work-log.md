# Braid Nested Shell Causal Closure Work Log

This file is the chronological work log for the `braid-nested-shell-causal-closure` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use the main priority tracker in this directory for the compact current queue, blockers, promotion routing, and next action. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-07-02 A0 Fail-Closed And Field-Speed Boundary Notes

Migrated from `priorities.md` so the tracker can retain compact current state while preserving detailed failed-row diagnostics and the 2026-05-20 field-speed boundary note.

Current fail-closed note: the compact $A_0$ no-omitted-mode scalar Fourier correction has status `failed_direct_one_period_residuals`. It removes bulk center drift and improves some one-period residual scales, but it does not close the branch. The diagnostic row reports
$$
R_{\text{state}}\approx1.008,
\qquad
\max R_{\text{root}}\approx23.49,
\qquad
R_{\text{speed}}\approx3.05,
\qquad
R_{\text{balance}}\approx0.993,
\qquad
\|\Delta\mathbf{C}_{A_0}\|_{\max}\approx8.96\times10^{-17}.
$$
The center-drift row passes, while state return, direct root closure, speed ordering, and residual balance fail; $\Delta_{\mathbf{k}}$ and the $\eta$ ladder remain uncomputed. This means the row is valuable as a source boundary for $\mathcal{C}_{\mathrm{NSH}}^{(q)}(W)$, not as a causal-closure success. The next branch-native move is an equality-constrained basis split $B_{\rho,\ell,\sigma,\mu,\nu}(t)$ by relation class, receiver layer, polarity, root branch key, and radial / tangential projection channel, or else a stronger compact-fixture no-go.

Field-speed boundary note, 2026-05-20: the collinear breather packet now contains a head-on $x_L=-1$, $x_R=+1$, $|v|=c_f$ in-flight wake audit and finite-history calculation. It shows that exact affine field-speed inbound history is not ordinary simple-root initial data: the partner wake is still in flight at the audit time, all affine partner source times co-arrive at the origin caustic, and same-source roots form a continuum with $J=0$. With the compact $C^1$ polynomial shell used in the finite-history fixture, the partner shell is exactly zero at $t=0$ because the partner support has not reached the receiver. The finite-history calculation sharpens the obstruction: fixed-regulator infinite history saturates, but the same-source self-continuum scales like $1/(\eta\epsilon_c)$ as the shell width and core scale are removed. Tri-binary middle-layer or horizon-interface uses of $v=c_f$ should therefore require finite-width, dephased, curved, held-release, or branch-certified history preparation before they are allowed to feed a clock, ruler, photon, or mass-response row.
