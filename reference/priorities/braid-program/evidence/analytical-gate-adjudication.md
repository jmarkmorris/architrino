# Analytical Gate Adjudication

## Scope and claim boundary

This packet records a solver-free prescribed-path gate-adjudication campaign. Every source path remained fixed. The campaign did not invoke the EOM solver and does not establish stability, energy, retention, or physical realization.

Claim grade: **measured** for the recorded numerical rows and wall times; **derived** for the two replacement gate definitions.

The authoritative machine-readable report is:

`.local-data/braid-analysis/gate-adjudication/targeted-resolution-ladders.v1.json`

That runtime artifact is intentionally outside Git.

## Gate-definition repairs

### Continuous minimum-separation certificate

The former numerical-convergence gate combined causal-root refinement with the change in a sampled minimum-separation estimate and required the identity of the sampled minimum pair to remain unchanged. The replacement separates these obligations.

For a grid with sample spacing $\Delta T$ and a pairwise relative-speed upper bound $V_{ij}$, a pair whose relative position closes over the declared period has sample covering radius $\rho_{ij}=\Delta T/2$. A nonclosing pair conservatively uses $\rho_{ij}=\Delta T$. The continuous separation obeys

$$
d_{ij}(T) \geq d_{ij}(T_k)-V_{ij}|T-T_k|
\geq d_{ij,\mathrm{sample}}-V_{ij}\rho_{ij}.
$$

The minimum-separation gate now uses the nonnegative lower bound

$$
d_{ij,\mathrm{lower}}
=
\max\left(
0,\,
d_{ij,\mathrm{sample}}-V_{ij}\rho_{ij}
\right).
$$

Root convergence retains its $10^{-9}$ event-ledger tolerance. Sampled minimum changes and minimum-pair labels remain diagnostic and no longer reject an otherwise converged root ledger.

Falsifier: reject this certificate if an independently evaluated trajectory violates the recorded speed bound or if a continuous separation falls below its recorded lower bound.

### Dimensionless source-sensitivity settling

The former source-sensitivity gate compared derivatives of dimensionless ratios and endpoint RMS acceleration response with one absolute threshold. The replacement evaluates each measure separately:

$$
u_m
=
\frac{|D_{m,h}-D_{m,h/2}|}
{\max\!\left(|D_{m,h}|,|D_{m,h/2}|,S_m\right)}.
$$

For exterior and wake-flux ratios, $S_m=1$. For an endpoint RMS acceleration row, $S_m$ is the maximum of the base endpoint RMS response and the declared numerical floor. The existing $0.02$ requirement is retained as a dimensionless two-percent settling gate.

Falsifier: reject the normalization if a declared measure lacks a dimensionally compatible scale or if its normalized uncertainty fails to decrease under step refinement.

## Targeted resolution results

### Surface-resolution ladder

The three declared comparisons were:

1. $12\times8\times16$ versus $24\times12\times24$;
2. $24\times12\times24$ versus $48\times16\times32$;
3. $48\times16\times32$ versus $96\times20\times40$.

The factors are time samples, Gauss-Legendre polar order, and azimuth count. All four enclosing radii were retained.

| Candidate | Worst frequency-resolved change, level 1 | Level 2 | Level 3 | Outcome |
| --- | ---: | ---: | ---: | --- |
| planar common-center three-binary constraint | $1.0000000003$ | $2.9003\times10^{-6}$ | $2.5689\times10^{-9}$ | Recovers at level 2 and settles further at level 3 |
| axial-transverse coincident-axis three-binary interior control | $1.2118\times10^{-3}$ | $1.9553\times10^{-6}$ | $3.7166\times10^{-9}$ | Passes all levels |
| coaxial-separated co-rotating two-component circular negative control | $1.8713$ | $1.6782$ | $1.3037$ | Remains rejected |

At level 3 for the coaxial-separated co-rotating two-component circular configuration, exposure, anisotropy, retained spectral power, aggregate wake flux, and out-of-band coverage pass their declared gates. The remaining blocker is a transmitter-root-tagged frequency coefficient at radius $1$, so the configuration remains unresolved rather than disproven.

### Source-sensitivity step ladder

| Candidate | $h=\pi/64$ | $h=\pi/128$ | $h=\pi/256$ | Outcome |
| --- | ---: | ---: | ---: | --- |
| coincident-midpoint equal-radius common-frequency orthogonal-axis three-binary configuration | $0.0242803$ | $0.00628424$ | $0.00158536$ | Recovers after one step halving |
| phase-compensated equal-geometry orthogonal-axis three-binary configuration | $0.0151602$ | $0.00383617$ | $0.000962031$ | Passes the corrected gate at every level |

Every perturbation retained matching root topology and an accepted perturbed surface/endpoint packet.

## Measured runtime

The complete five-candidate harness took $1389.41$ seconds on the operator's Mac.

- Surface ladders: $1246.43$ seconds, or $89.7\%$ of measured wall time.
- Sensitivity ladders: $142.96$ seconds, or $10.3\%$.
- The coaxial-separated co-rotating two-component circular configuration at the largest surface level alone took $424.41$ seconds.

The next cohort protocol adopts level 2 surface resolution and the $h=\pi/128$, $h/2=\pi/256$ sensitivity stencil. Level 3 should be reserved for changed or marginal verdicts rather than applied uniformly.

## Outstanding obligations

1. Run the complete 19-candidate nonpublishing rebuild under the revised protocol and independent acceptance instrument.
2. Determine whether the coaxial-separated co-rotating two-component circular configuration's moving worst coefficient converges under a targeted frequency-only ladder, a larger retained harmonic band, or an error-bounded coefficient floor. Do not relax the five-percent gate while the discrepancy remains order one.
3. Add checkpoint/resume support to the adjudication harness. Fine-grained surface heartbeats are implemented, but a terminated run still restarts the current report.
4. Reassess radial-exponent rows with an uncertainty-aware positive-measure floor after the complete cohort rebuild.
5. Publish a new SQLite generation only after the nonpublishing rebuild, targeted tests, deterministic export verification, and database integrity checks pass.

Promotion disposition: **priority-only**. The results repair analytical instrumentation and select a reproducible protocol; they do not support reader-facing stability or physical-realization claims.
