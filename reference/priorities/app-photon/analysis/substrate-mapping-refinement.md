# PHO-005 Substrate-Mapping Refinement

## Status And Claim Boundary

This packet closes the Photon app's source-bound map from retained I/M/O causal-root contributions to transverse Virtual Observer amplitudes. Its authority is `measured` at `display-only-visualization` grade: the Photon runtime emits the declared record and focused tests verify its algebraic identities. It does not establish a retained photon assembly, photon stability, Malus-law recovery, helicity recovery, a physical electromagnetic field, or a Noether sea constitutive law.

The source rule is the transmitter-side acceleration weight derived in [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) and fixed by the [Master-EOM binding](../../app-solver/contracts/master-eom-binding-v1.md). The implementation is [PhotonFormulaRuntime.js](../../../../src/apps/photon/PhotonFormulaRuntime.js), and the focused checks are in [photon-runtime.test.js](../../../../tests/photon-runtime.test.js).

Plainly: this packet explains exactly how the app turns its prescribed source histories into a diagnostic graph. It verifies the bookkeeping and the code path, not the existence of a real photon.

## Declared Inputs And Mode Separation

Every `photon-substrate-mapping-refinement.v1` record declares:

| Input | Meaning |
| --- | --- |
| `transmitterHistoryMode` | `co_moving` or `absolute_history`; the two modes are never merged into one result |
| `transmitterMode` | exact runtime path that produced the retained contribution rows |
| `signalSpeedCf` | $c_{\mathrm{sig}}/c_f$ used by the causal-root equation and transmitter-side weight |
| `photonSpeedCf` | $c_\gamma/c_f$ used by absolute-history translation |
| `virtualObserver` | declared receiver coordinate in app units |
| `referenceFrequency` | frequency whose transverse harmonic is fitted |
| `fitWindow` | slowest-enabled-layer common period used for every total and layer-resolved fit |
| `sampleCount` | number of uniformly spaced samples in that window |
| `activeTransmitterCountByLayer` | enabled transmitter count for I, M, and O |

In `co_moving` mode the braid centers and Virtual Observer remain fixed in the app frame. In `absolute_history` mode each transmitter center and the Virtual Observer translate along $+\hat{\mathbf x}$ at $c_\gamma$ before the root solve. A result from one mode may be compared with the other, but it may not inherit the other mode's roots, amplitudes, or coverage status.

Plainly: each output says which histories, speeds, observer location, time window, and sample count produced it. A co-moving picture cannot silently masquerade as a moving-apparatus result.

## Source-Bound Branch Map

Let $i=(s,\ell,q)$ identify braid role $s$, layer $\ell\in\{I,M,O\}$, and polarity $q\in\{+1,-1\}$. For retained root $k$ at reception time $t$, define

$$
D_{t,i,k}=c_{\mathrm{sig}}-\mathbf v_i(\tau_{i,k})\cdot\mathbf n_{i,k},
\qquad
D_{r,i,k}=c_{\mathrm{sig}}-\mathbf v_{\mathrm{VO}}(t)\cdot\mathbf n_{i,k}.
$$

The root-playback derivative is $D_{r,i,k}/D_{t,i,k}$, while the instantaneous transmitter-side acceleration weight is

$$
W^{\mathrm{acc}}_{i,k}=\frac{c_{\mathrm{sig}}}{|D_{t,i,k}|}.
$$

The Photon display uses unit coupling and a unit positive receiver. Its retained contribution is

$$
\mathbf a_{i,k}(t)
=
q_i W^{\mathrm{acc}}_{i,k}
\frac{\mathbf n_{i,k}}{R_{\mathrm{display},i,k}^{2}},
\qquad
R_{\mathrm{display},i,k}=\max(R_{i,k},0.08).
$$

The distance floor is a declared display regularization only. It carries no short-distance-law authority. A missing or inconsistent $D_t$, $D_r$, root-playback, or acceleration-weight row contributes zero and is counted as unstable rather than reconstructed from incomplete fields.

Plainly: the source motion controls the arriving causal-surface density. Receiver motion controls how a root is replayed through time, but it does not strengthen or weaken an already arrived hit. Incomplete causal-factor records fail closed.

For each layer, the runtime forms

$$
\mathbf E_{\perp,\ell}(t)
=
\sum_{s,q,k:\,i=(s,\ell,q)}
\left[
(\mathbf a_{i,k}\cdot\hat{\mathbf y})\hat{\mathbf y}
+
(\mathbf a_{i,k}\cdot\hat{\mathbf z})\hat{\mathbf z}
\right],
$$

and the total transverse diagnostic is

$$
\mathbf E_\perp(t)=\sum_{\ell\in\{I,M,O\}}\mathbf E_{\perp,\ell}(t).
$$

Plainly: every retained hit is assigned to exactly one of I, M, or O. Adding those three ledgers must reproduce the graph's total transverse field sample by sample.

## Harmonic Amplitude Map

At uniformly spaced samples $t_n$ over the declared common-period window, with reference phase $\varphi_n=2\pi f_{\mathrm{ref}}(t_n-t_0)$, each transverse component $a\in\{y,z\}$ is mapped to

$$
\bar E_{a,\ell}=\frac{1}{N}\sum_{n=0}^{N-1}E_{a,\ell}(t_n),
$$

$$
C_{a,\ell}=\frac{2}{N}\sum_{n=0}^{N-1}\left(E_{a,\ell}(t_n)-\bar E_{a,\ell}\right)\cos\varphi_n,
\qquad
S_{a,\ell}=\frac{2}{N}\sum_{n=0}^{N-1}\left(E_{a,\ell}(t_n)-\bar E_{a,\ell}\right)\sin\varphi_n,
$$

$$
A_{a,\ell}=\sqrt{C_{a,\ell}^{2}+S_{a,\ell}^{2}},
\qquad
\phi_{a,\ell}=\operatorname{atan2}(-S_{a,\ell},C_{a,\ell}).
$$

The same projection is applied to the total field. Linearity requires the total DC, cosine, and sine coefficients to equal the sums of the I/M/O coefficients. Amplitudes themselves are not added, because phase cancellation or reinforcement occurs at the coefficient level.

Plainly: the runtime first adds source contributions as vectors, then measures the selected repeating component. It retains each layer's phase, so two large layer amplitudes that cancel are not falsely reported as a large total amplitude.

## Residual And Coverage Ledger

The runtime emits four distinct residual or coverage families:

| Field | Definition | Interpretation |
| --- | --- | --- |
| `branchSumResidual` | normalized RMS difference between each total sample and its summed I/M/O samples | tests contribution grouping |
| `harmonicClosureResidual` | normalized difference between total harmonic coefficients and summed I/M/O coefficients | tests amplitude-ledger linearity |
| `totalFitResidual` | normalized RMS difference between the sampled total field and its selected-frequency fit | measures how much of the sampled field the one-frequency fit omits |
| `delaySolveGapMax` | largest retained root-equation residual in the fit window | reports root-solve quality |

Coverage is reported separately as the maximum unresolved and unstable transmitter counts plus the minimum absolute transmitter Jacobian over the fit window. `complete_for_declared_samples` means every declared transmitter produced a usable retained-row result at every sampled time. `partial_retained_root_sum` means the algebraic sum is still exact for retained rows but at least one sample had unresolved or unstable transmitter coverage.

Plainly: a clean addition identity does not prove that every source was found, and a high one-frequency fit residual does not mean the root bookkeeping is wrong. The record keeps those questions separate.

## Falsifiers And Acceptance

| Claim | Acceptance condition | Falsifier |
| --- | --- | --- |
| I/M/O partition reproduces the transverse field | `branchSumResidual <= 1e-9` | a total sample differs from the sum of its three layer samples above tolerance |
| Layer harmonic ledger reproduces the total harmonic coefficients | `harmonicClosureResidual <= 1e-9` | any total DC, cosine, or sine coefficient fails coefficient-level closure above tolerance |
| Mode identity is preserved | record carries both `transmitterHistoryMode` and exact `transmitterMode` | a co-moving result is labeled absolute-history, or either path consumes roots from the other mode |
| Canonical acceleration weight is used | every admitted row satisfies $W^{\mathrm{acc}}=c_{\mathrm{sig}}/|D_t|$ and keeps $D_r/D_t$ separate | receiver playback multiplies acceleration, an invalid causal-factor row contributes nonzero acceleration, or the code reconstructs missing fields |
| Coverage is honestly stated | incomplete rows yield `partial_retained_root_sum` and retain diagnostics | an unresolved or unstable transmitter is presented as complete coverage |
| Claim boundary is preserved | record remains `display-only-visualization` | the ledger is cited as photon retention, stability, physical field, helicity, Malus-law, or constitutive-law evidence |

Focused validation on 2026-09-02 passed 54 of 54 Photon runtime tests. The new checks exercise both mode labels, exact I/M/O transmitter counts, sample-level branch closure, coefficient-level harmonic closure, and the existing fail-closed causal-factor behavior.

Plainly: PHO-005 is complete when the app can show where its amplitude comes from, quantify its own bookkeeping error, and say when its source coverage is incomplete. Those conditions are now machine-readable and tested without elevating the display into photon evidence.
