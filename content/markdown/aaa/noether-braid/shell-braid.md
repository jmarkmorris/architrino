# Shell Braid

This chapter defines the one-band support family in the [Noether Braid](noether-braid.md) sequence. A shell braid adds controlled radial support to a [neutral braid](neutral-braid.md) without yet asserting the three ordered support bands of a [nested shell braid](nested-shell-braid.md).

A **shell braid** is a neutral braid whose six trajectories remain in a controlled radial band around a branch center $C(t)$. For a representative shell scale $R_*$ and band limits $R_-<R_+$, the shell condition is

$$
R_-\leq
\left\| X_i(t)-C(t)\right\|
\leq R_+,
\qquad
i=1,\ldots,6
$$

A narrow shell branch has small relative spread,

$$
\frac{R_+-R_-}{R_*}\leq\varepsilon_{\mathrm{shell}}
$$

while a broader shell branch keeps only the hollow-band condition. This is still not the nested shell braid. It is a one-band neutral braid whose support is spatially organized strongly enough to produce a persistent exclusion envelope, shielding pattern, and Noether sea coupling channel.

Near-antipodality is an optional shell braid constraint, not a definition of the neutral braid. A shell branch may carry an approximate polarity-reversing matching $\iota$ with $\iota^2=\mathrm{id}$ and $\sigma_{\iota(i)}=-\sigma_i$. Relative to a branch center $C(t)$, define the near-antipodality defect

$$
\delta_{\mathrm{anti},i}(t)
=
\frac{
\left\| X_i(t)+X_{\iota(i)}(t)-2C(t)\right\|
}{R_*}
$$

Exact antipodality, $\delta_{\mathrm{anti},i}=0$, is an ideal symmetry chart. It should not be expected in ordinary conditions: an external potential can disturb one member of the matching first, and the delayed response takes time to circulate through the full six-body causal ledger. The physical shell claim is therefore near-antipodality plus recovery,

$$
\sup_{t\in J}\delta_{\mathrm{anti},i}(t)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(t+T_{\mathrm{rec}})
\leq
\kappa\,\delta_{\mathrm{anti},i}(t)+\varepsilon_{\mathrm{drive}}
$$

for a branch interval $J$, recovery time $T_{\mathrm{rec}}$, contraction factor $0\leq\kappa<1$, and driving residue $\varepsilon_{\mathrm{drive}}$. Near-antipodality is useful because it captures the shell branch's tendency to restore opposite-side balance without pretending that the two matched architrinos remain in lockstep under perturbation.
