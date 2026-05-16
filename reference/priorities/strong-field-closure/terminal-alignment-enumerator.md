# Terminal Alignment Enumerator Packet

## Status

- Kind: `priority-proof-packet`
- Workstream task: `horizon_entropy_packet`
- Status: `kinematic-baseline-implemented`

## Purpose

This packet records the first executable form of the terminal-alignment transfer-matrix route in [strong-field-closure](strong-field-closure.md) and [Tri-Binary Dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md#terminal-alignment-label-count-target). It is a success marker under the existing horizon entropy proof route, not a new gate.

The implemented script is:

```text
node scripts/tri-binary/terminal-alignment-enumerator.mjs
```

It enumerates reduced circular terminal-kinematic labels, delayed inter-layer roots, branch Jacobian transversality, observer-quotiented edge-map multisets, and the resulting edge-map transfer proxy.

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

The coarse edge-map quotient produced a nonempty transfer proxy, but only through self-compatibility. The strict quotient produced the same classification for this reduced run:

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

This does not recover the target local coefficient. The important result is negative but useful: the reduced concentric circular terminal kinematics, by itself, supplies transversal branch inventories and edge maps, but it does not create the nontrivial label growth needed for

$$
s_{\mathrm{align}}(\theta)\to\frac{1}{4}.
$$

## Interpretation

The result isolates the missing mechanism. Nonzero horizon block entropy cannot come from merely listing terminal circular roots under the current coarse quotient. At least one of the following must enter before the area coefficient can appear:

1. a nontrivial observer quotient that identifies cross-label edge data without erasing Page-compatible release information;
2. an action kernel whose acceleration and ledger increments turn the kinematic edge maps into conservation-compatible transitions;
3. terminal branch families beyond the concentric circular ansatz, such as shifted centers, axial-frame variants, wake-memory classes, or inter-layer phase offsets that survive the Physical Observer quotient;
4. a two-dimensional patch-network pressure rather than a one-strip self-loop proxy.

## Remaining Proof Obligations

The script explicitly leaves these proof obligations unresolved:

- compute $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}(\lambda)$ from a declared action kernel;
- assign branch increments $(\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b)$ so edge compatibility includes the local conservation ledger;
- replace the coarse numerical edge quotient with the Physical Observer quotient $\sim_{O,\theta,W}$ for a declared strong-field record $\theta$;
- rerun the transfer calculation on the resulting admissible $\Lambda_{\theta}^{\mathrm{loc}}$;
- test whether the two-dimensional block pressure, not only the one-dimensional strip proxy, can approach the target coefficient.

## Failure Interpretation

If the action-complete rerun still produces only self-loops or a spectral radius too close to `1`, the terminal-alignment label-count route does not carry enough entropy density. In that case the black-hole entropy route must either find the coefficient in release-channel ledgers, Noether-Sea boundary-wake storage, or a stronger observer quotient, or it must mark the horizon entropy recovery as failed rather than importing the area law as ontology.
