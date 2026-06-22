# Terminal Alignment Enumerator Packet

## Status

- Kind: `priority-proof-packet`
- Workstream task: `horizon_entropy_packet`
- Status: `terminal-dynamic-diagnostic-implemented`

## Purpose

This packet records the first executable form of the terminal-alignment transfer-matrix route in [strong-field-closure](strong-field-closure.md) and [Nested Shell Braid Dynamics](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md#terminal-alignment-label-count-target). It is a success marker under the existing horizon entropy proof route, not a new gate.

The implemented script is:

```text
node scripts/nested-shell-swarm/terminal-alignment-enumerator.mjs
```

It enumerates reduced circular terminal labels, delayed inter-layer roots, active intra-layer circular-root rows, branch Jacobian transversality, diagnostic branch-action rows, receiver-side and source-recoil ledger residuals, per-branch stationarity residuals, branch-summed action-variation residuals, cycle-residual adapters, observer-quotiented edge-map multisets, area-normalized finite-block coefficients, and the resulting transfer proxies.

## Current Command

The first reduced run used:

```text
node scripts/nested-shell-swarm/terminal-alignment-enumerator.mjs \
  --max-n 5 \
  --phase-samples 8 \
  --delta-samples 160 \
  --pretty
```

The run sampled primitive integer locks

$$
(k_I,k_M,k_O)\in
\{(3,2,1),(4,2,1),(4,3,1),(5,2,1),(5,3,1),(5,4,1)\}.
$$

For each candidate it found the expected zero-delay self-root boundary class and an interior partner root for each layer. It also found `192` delayed inter-layer roots per candidate in the one-period search window, with all sampled delayed roots above the declared Jacobian floor in this reduced setup. The current implementation materializes active partner-hit rows from those circular roots and inventories zero-delay self-hit boundaries without treating them as forces, in accordance with $H(0)=0$.

## Transfer Result

The coarse edge-map quotient still produces a nonempty transfer proxy, but only through self-compatibility:

$$
\mathsf{T}_{\theta,\nu}
=
I_6
$$

for the six sampled labels above. Therefore the current strip proxy has

$$
\rho(\mathsf{T}_{\theta,\nu})=1,
\qquad
\log\rho(\mathsf{T}_{\theta,\nu})=0.
$$

The action-complete diagnostic transfer is stricter. It requires edge-key agreement, edge-ledger balance, local conservation closure, and a passing cycle-residual adapter. Under the default inverse-square diagnostic kernel with least-squares fitted strength, the sampled local conservation residual closes to numerical roundoff, but the cycle-residual adapter fails. The action-complete transfer matrix is therefore empty:

$$
\rho(\mathsf{T}_{\theta,\nu}^{\mathrm{act}})=0.
$$

The newer `terminal_dynamic` transfer adds paired source-recoil ledgers and uses the branch-summed receiver-side action-variation residual, after the direct inverse-square term is removed, as the scalar-action closure predicate. The per-branch stationarity diagnostic remains in the output as obstruction context. The JSON now reports `action_diagnostics.per_branch_stationarity_residual`, `action_diagnostics.action_variation_residual`, transfer-row `per_branch_stationarity_max_residual`, and a terminal `epsilon_var` inherited from the branch-summed transfer-row maximum. The transfer remains empty in the same reduced concentric circular family. With `3 <= n <= 5`, `phase-samples = 12`, `block-size = 16`, and the `layer-sum` area proxy, each candidate has `288` inter-layer rows, `72` active partner-hit rows, and `72` zero-delay self-hit boundary rows excluded from the action sum. The edge-only finite coefficient is about `0.09174`, but the terminal-dynamic coefficient is undefined because no transfer edges are accepted. The maximum per-branch stationarity residual is about `166.83`, and the maximum branch-summed residual is about `609.71`. With `3 <= n <= 6`, the edge-only finite coefficient is about `0.12120`, the terminal-dynamic transfer is still empty, the maximum per-branch stationarity residual rises to about `322.67`, and the maximum branch-summed residual rises to about `1732.12`.

The first bounded phase-offset branch family is also implemented through `--terminal-family phase-offset`. It uses $\phi_I=-2\pi f$, $\phi_M=2\pi f$, and $\phi_O=0$ for `--terminal-phase-offset f`. Runs at `f = 0.125` and `f = 0.25` increased the delayed inter-layer inventory to `288` sampled roots per candidate and the active terminal inventory to `360` sampled action rows per candidate, but still produced zero terminal-dynamic transfer edges under both coarse and strict quotients. The edge-only finite coefficients remained about `0.09174` for `3 <= n <= 5` and `0.12120` for `3 <= n <= 6`; the maximum per-branch stationarity residual remained large, reaching about `179.54` at `f = 0.125` and `322.67` in the widened packet. For `3 <= n <= 5`, the branch-summed residual reached about `610.80` at `f = 0.125` and `626.25` at `f = 0.25`.

The first shifted-center branch family is implemented through `--terminal-family shifted-center` and `--terminal-center-shift`. It keeps the circular speeds and layer phases fixed, but offsets the layer centers by an equilateral center pattern whose magnitude is the declared fraction of the outer alignment radius. Runs at center shifts `0.01`, `0.05`, and `0.10` again found `288` sampled delayed roots per candidate and `360` active sampled action rows per candidate, but produced zero terminal-dynamic transfer edges. Shifts `0.05` and `0.10` were empty even at the edge-proxy level for both `3 <= n <= 5` and `3 <= n <= 6`. The smaller `0.01` run produced only one widened edge-proxy edge at `3 <= n <= 6`, with zero finite-block coefficient and no terminal-dynamic transfer. The maximum per-branch stationarity residual stayed large, from about `620.96` at shift `0.01` through about `1103.36` in the shift `0.05` widened packet; the maximum branch-summed residual was larger, reaching about `9247.22` at shift `0.01`, `4570.42` at shift `0.05`, and `5944.41` at shift `0.10`.

The reason is structural. In the reduced concentric circular model, the terminal-branch action sum fits the required circular terminal acceleration poorly even after active partner-hit rows are included; the remaining acceleration residual is still of order the circular acceleration itself. The sampled branch-summed action-variation residual also fails the scalar-action closure target, while the per-branch stationarity residual remains useful only as obstruction context. This does not recover the target local coefficient. The important result is negative but useful: reduced concentric circular terminal kinematics plus the diagnostic action kernel supplies transversal branch inventories, area-normalized finite-block output, source-recoil residuals, and edge maps, but it does not create the nontrivial label growth, cycle support, or action stationarity needed for

$$
s_{\mathrm{align}}(\theta)\to\frac{1}{4}.
$$

## Interpretation

The result isolates the missing mechanism. Nonzero horizon block entropy cannot come from merely listing terminal circular roots under the current coarse quotient, and it also cannot come from the first symmetric diagnostic action kernel. At least one of the following must enter before the area coefficient can appear:

1. a nontrivial observer quotient that identifies cross-label edge data without erasing Page-compatible release information;
2. an asymmetric or regularized action kernel whose acceleration and ledger increments turn the edge maps into conservation-compatible, cycle-supporting transitions;
3. terminal branch families beyond the concentric circular, bounded phase-offset, and first shifted-center ansatz, such as axial-frame variants or wake-memory classes that survive the Physical Observer quotient;
4. a two-dimensional patch-network pressure rather than a one-strip self-loop proxy.

The current action-kernel candidate is the delayed-interior characteristic-tail kernel promoted in the dynamics canon:

$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds,
\qquad
u=g+\frac{r}{c_f}.
$$

It satisfies

$$
\left(
\partial_r-\frac{1}{c_f}\partial_g
\right)
K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2},
$$

after characteristic endpoint normalization. This makes it the first non-diagnostic replacement candidate for the inverse-square branch adapter. It is still not executable terminal closure until the enumerator consumes the Noether boundary increments from the same kernel.

The Master Equation now fixes those normalized wake-history increments for energy, momentum, and angular momentum. The remaining terminal-alignment work is therefore implementation and branch-chart evaluation: replace the diagnostic source-recoil and scalar-action rows with the normalized characteristic-tail increments, then test whether the mechanical plus wake ledger closes on the same active terminal rows that pass the force and root-ledger predicates.

## Remaining Proof Obligations

The script explicitly leaves these proof obligations unresolved:

- replace the diagnostic inverse-square branch action with the normalized delayed-interior characteristic-tail kernel and its Master-Equation wake-history increments;
- compute $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}(\lambda)$ from the declared action kernel, including intra-layer action and regularization;
- replace the diagnostic source-recoil impulse ledger with the normalized energy, momentum, and angular-momentum boundary increments;
- replace the coarse numerical edge quotient with the Physical Observer quotient $\sim_{O,\theta,W}$ for a declared strong-field record $\theta$;
- rerun the transfer calculation on the resulting admissible $\Lambda_{\theta}^{\mathrm{loc}}$;
- test whether the two-dimensional block pressure, not only the one-dimensional strip proxy, can approach the target coefficient;
- test branch families beyond the concentric circular, bounded phase-offset, and first shifted-center ansatz, because the current terminal-dynamic residuals fail before the transfer matrix can carry entropy density.

## Failure Interpretation

If the action-complete rerun still produces only self-loops or a spectral radius too close to `1`, the terminal-alignment label-count route does not carry enough entropy density. In that case the black-hole entropy route must either find the coefficient in release-channel ledgers, Noether sea boundary-wake storage, or a stronger observer quotient, or it must mark the horizon entropy recovery as failed rather than importing the area law as ontology.
