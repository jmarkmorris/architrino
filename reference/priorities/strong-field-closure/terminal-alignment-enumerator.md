# Terminal Alignment Enumerator Packet

## Status

- Kind: `priority-proof-packet`
- Workstream task: `horizon_entropy_packet`
- Status: `terminal-dynamic-diagnostic-implemented`

## Purpose

This packet records the first executable form of the terminal-alignment transfer-matrix route in [strong-field-closure](strong-field-closure.md) and [Tri-Binary Dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md#terminal-alignment-label-count-target). It is a success marker under the existing horizon entropy proof route, not a new gate.

The implemented script is:

```text
node scripts/tri-binary/terminal-alignment-enumerator.mjs
```

It enumerates reduced circular terminal labels, delayed inter-layer roots, branch Jacobian transversality, diagnostic branch-action rows, receiver-side and source-recoil ledger residuals, action-variation stationarity residuals, cycle-residual adapters, observer-quotiented edge-map multisets, area-normalized finite-block coefficients, and the resulting transfer proxies.

## Current Command

The first reduced run used:

```text
node scripts/tri-binary/terminal-alignment-enumerator.mjs \
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

For each candidate it found the expected zero-delay self-root boundary class and an interior partner root for each layer. It also found `192` delayed inter-layer roots per candidate in the one-period search window, with all sampled delayed roots above the declared Jacobian floor in this reduced setup.

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

The newer `terminal_dynamic` transfer adds paired source-recoil ledgers and the sampled action-variation stationarity residual. It remains empty in the same reduced concentric circular family. With `3 <= n <= 5`, `phase-samples = 12`, `block-size = 16`, and the `layer-sum` area proxy, the edge-only finite coefficient is about `0.09174`, but the terminal-dynamic coefficient is undefined because no transfer edges are accepted. The maximum sampled stationarity residual is about `166.83`. With `3 <= n <= 6`, the edge-only finite coefficient is about `0.12120`, the terminal-dynamic transfer is still empty, and the maximum stationarity residual rises to about `322.67`.

The first bounded phase-offset branch family is also implemented through `--terminal-family phase-offset`. It uses $\phi_I=-2\pi f$, $\phi_M=2\pi f$, and $\phi_O=0$ for `--terminal-phase-offset f`. Runs at `f = 0.125` and `f = 0.25` increased the delayed inter-layer inventory to `288` sampled roots per candidate but still produced zero terminal-dynamic transfer edges under both coarse and strict quotients. The edge-only finite coefficients remained about `0.09174` for `3 <= n <= 5` and `0.12120` for `3 <= n <= 6`; the maximum stationarity residual remained large, reaching about `179.54` at `f = 0.125` and `322.67` in the widened packet.

The first shifted-center branch family is implemented through `--terminal-family shifted-center` and `--terminal-center-shift`. It keeps the circular speeds and layer phases fixed, but offsets the layer centers by an equilateral center pattern whose magnitude is the declared fraction of the outer alignment radius. Runs at center shifts `0.01`, `0.05`, and `0.10` again found `288` sampled delayed roots per candidate but produced zero terminal-dynamic transfer edges. Shifts `0.05` and `0.10` were empty even at the edge-proxy level for both `3 <= n <= 5` and `3 <= n <= 6`. The smaller `0.01` run produced only one widened edge-proxy edge at `3 <= n <= 6`, with zero finite-block coefficient and no terminal-dynamic transfer. The maximum stationarity residual stayed large, from about `620.96` at shift `0.01` through about `1103.36` in the shift `0.05` widened packet.

The reason is structural. In the reduced concentric circular model, the symmetric inter-layer action sum fits the required circular terminal acceleration with an effectively zero fitted strength; the remaining acceleration residual is the circular acceleration itself. The sampled action-variation residual also fails the stationarity condition exposed by the scalar-action no-go result. This does not recover the target local coefficient. The important result is negative but useful: reduced concentric circular terminal kinematics plus the diagnostic action kernel supplies transversal branch inventories, area-normalized finite-block output, source-recoil residuals, and edge maps, but it does not create the nontrivial label growth, cycle support, or action stationarity needed for

$$
s_{\mathrm{align}}(\theta)\to\frac{1}{4}.
$$

## Interpretation

The result isolates the missing mechanism. Nonzero horizon block entropy cannot come from merely listing terminal circular roots under the current coarse quotient, and it also cannot come from the first symmetric diagnostic action kernel. At least one of the following must enter before the area coefficient can appear:

1. a nontrivial observer quotient that identifies cross-label edge data without erasing Page-compatible release information;
2. an asymmetric or regularized action kernel whose acceleration and ledger increments turn the edge maps into conservation-compatible, cycle-supporting transitions;
3. terminal branch families beyond the concentric circular, bounded phase-offset, and first shifted-center ansatz, such as axial-frame variants or wake-memory classes that survive the Physical Observer quotient;
4. a two-dimensional patch-network pressure rather than a one-strip self-loop proxy.

## Remaining Proof Obligations

The script explicitly leaves these proof obligations unresolved:

- replace the diagnostic inverse-square branch action with the declared substrate action kernel;
- compute $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}(\lambda)$ from the declared action kernel, including intra-layer action and regularization;
- replace the diagnostic source-recoil impulse ledger with Noether boundary increments from an accepted regularized action;
- replace the coarse numerical edge quotient with the Physical Observer quotient $\sim_{O,\theta,W}$ for a declared strong-field record $\theta$;
- rerun the transfer calculation on the resulting admissible $\Lambda_{\theta}^{\mathrm{loc}}$;
- test whether the two-dimensional block pressure, not only the one-dimensional strip proxy, can approach the target coefficient;
- test branch families beyond the concentric circular, bounded phase-offset, and first shifted-center ansatz, because the current terminal-dynamic residuals fail before the transfer matrix can carry entropy density.

## Failure Interpretation

If the action-complete rerun still produces only self-loops or a spectral radius too close to `1`, the terminal-alignment label-count route does not carry enough entropy density. In that case the black-hole entropy route must either find the coefficient in release-channel ledgers, Noether-Sea boundary-wake storage, or a stronger observer quotient, or it must mark the horizon entropy recovery as failed rather than importing the area law as ontology.
